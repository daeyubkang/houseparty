const { Users, Parties, Chat, ChatMessage } = require("../models");

exports.connection = (io, socket) => {
  console.log("접속");

  //채팅방 목록 보내기
  socket.on("roomList", async (userName, cb) => {
    const roomList = [];
    let chatList = await Chat.findAll({
      attributes: ["roomID", "party_num", "participant_id", "host_id"],
    });
    for (let i = 0; i < chatList.length; i++) {
      console.log("chatLists", chatList[i]);
      const participant = chatList[i].dataValues.participant_id.split(" ");
      for (let j = 0; j < participant.length; j++) {
        if (participant[j] == userName) {
          roomList.push({
            roomName: chatList[i].dataValues.roomID,
            participant_num: participant.length,
            participant: participant,
            partiesId: chatList[i].dataValues.participant_id,
          });
        }
      }
    }
    cb(roomList);
  });

  //채팅방 만들기 생성
  socket.on("create", async (roomName, userName, partiesId, cb) => {
    //DB 존재여부 판별
    const chatroomExist = await Chat.findOne({
      where: { roomID: roomName },
    });
    console.log("chatroomExist", chatroomExist);
    if (!chatroomExist) {
      Chat.create({
        roomID: roomName,
        party_num: partiesId,
        participant_id: userName,
      });
    } else {
      const participant = chatroomExist.participant_id.split(" ");
      let flag = false;
      for (let i = 0; i < participant.length; i++) {
        if (participant[i] == userName) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        const participantID = `${chatroomExist.participant_id} ${userName}`;
        Chat.update(
          { participant_id: participantID },
          { where: { chat_key: chatroomExist.chat_key } }
        );
      }
      const beforeChat = await ChatMessage.findAll({
        where: { chat_key: roomName },
      });
      console.log("beforeChat", beforeChat);
      let send_before_chat = [];
      for (let i = 0; i < beforeChat.length; i++) {
        console.log("beforeChat", beforeChat[i].dataValues.send_message);
        send_before_chat.push({
          send_id: beforeChat[i].dataValues.send_id,
          send_message: beforeChat[i].dataValues.send_message,
        });
      }
      cb(send_before_chat);
    }

    //join(방이름) 해당 방이름으로 없다면 생성. 존재하면 입장
    //socket.rooms에 socket.id값과 방이름 확인가능
    socket.join(roomName);
    //socket은 객체이며 원하는 값을 할당할 수 있음
    socket.room = roomName;
    socket.user = userName;

    socket.to(roomName).emit("notice", `${socket.user}님이 입장하셨습니다`);

    //채팅방 목록 갱신
    // if (!roomList.includes(roomName)) {
    //   roomList.push(roomName);
    //   //갱신된 목록은 전체가 봐야함
    //   io.emit("roomList", roomList);
    // }

    const usersInRoom = getUsersInRoom(roomName);
    io.to(roomName).emit("userList", usersInRoom);
    cb();
  });

  socket.on("sendMessage", (message) => {
    console.log(message);
    console.log(socket.room);
    ChatMessage.create({
      chat_key: socket.room,
      send_id: message.nick,
      send_message: message.message,
    });
    if (message.user === "all") {
      io.to(socket.room).emit(
        "newMessage",
        message.message,
        message.nick,
        false
      );
    } else {
      io.to(message.user).emit(
        "newMessage",
        message.message,
        message.nick,
        true
      );
      //자기자신에게 메세지 띄우기
      socket.emit("newMessage", message.message, message.nick, true);
    }
  });

  socket.on("disconnect", () => {
    if (socket.room) {
      socket.leave(socket.room);
    }
  });

  function getUsersInRoom(room) {
    const users = [];
    //채팅룸에 접속한 socket.id값을 찾아야함
    const clients = io.sockets.adapter.rooms.get(room);
    //console.log(clients);
    if (clients) {
      clients.forEach((socketId) => {
        //io.sockets.sockets: socket.id가 할당한 변수들의 객체값
        const userSocket = io.sockets.sockets.get(socketId);
        //개별 사용자에게 메세지를 보내기 위해서 객체형태로 변경
        //key: 소켓아이디, name:이름
        const info = { name: userSocket.user, key: socketId };
        users.push(info);
      });
    }
    return users;
  }
};
