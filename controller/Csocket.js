const { STRING } = require("sequelize");
const { Users, Parties, Chat, ChatMessage } = require("../models");

exports.connection = (io, socket) => {
  // console.log("접속");

  //채팅방 목록 보내기
  socket.on("roomList", async (userName, cb) => {
    const roomList = [];
    let chatList = await Chat.findAll({
      attributes: ["roomID", "party_num", "participant_id", "host_id"],
    });
    for (let i = 0; i < chatList.length; i++) {
      // console.log("chatLists", chatList[i]);
      const participant = chatList[i].dataValues.participant_id.split(",");
      for (let j = 0; j < participant.length; j++) {
        if (participant[j] == userName) {
          let otherId = "";
          participant.forEach((element) => {
            if (element[0] != "게" && element != userName) {
              otherId = element;
            }
          });
          // console.log(otherId);
          const userImg = await Users.findOne({
            where: { id: otherId },
          });
          // console.log(userImg);
          if (!userImg) {
            roomList.push({
              roomID: chatList[i].dataValues.party_num,
              roomName: chatList[i].dataValues.roomID,
              participant_num: participant.length,
              participant: participant,
              partiesId: chatList[i].dataValues.participant_id,
              imgURL: false,
            });
          } else {
            roomList.push({
              roomID: chatList[i].dataValues.party_num,
              roomName: chatList[i].dataValues.roomID,
              participant_num: participant.length,
              participant: participant,
              partiesId: chatList[i].dataValues.participant_id,
              imgURL: userImg.imgURL,
            });
          }
        }
      }
    }
    cb(roomList);
  });

  //채팅방 만들기 생성
  socket.on(
    "create",
    async (roomName, userName, partiesId, partiesDataId, cb) => {
      // console.log(roomName);
      let roomName1 = "";
      if (roomName.split(" ")[0] == "단톡") {
        roomName1 = userName;
      } else {
        roomName1 = roomName;
      }
      //DB 존재여부 판별
      const chatroomExist = await Chat.findOne({
        where: { roomID: roomName },
      });
      // console.log("chatroomExist", chatroomExist);
      if (!chatroomExist) {
        Chat.create({
          roomID: roomName,
          party_num: partiesId,
          participant_id: roomName1, //단톡방이랑 다름
          host_id: partiesDataId,
        });
        cb({ beforeChat: false, chatData: false });
      } else {
        const participant = chatroomExist.participant_id.split(",");
        let flag = false;
        for (let i = 0; i < participant.length; i++) {
          if (participant[i] == userName) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          //단톡방 참가자 추가 코드
          const participantID = `${chatroomExist.participant_id},${userName}`;
          Chat.update(
            { participant_id: participantID },
            { where: { chat_key: chatroomExist.chat_key } }
          );
        }
        const beforeChat = await ChatMessage.findAll({
          where: { chat_key: roomName },
        });
        // console.log("beforeChat", beforeChat);
        let send_before_chat = [];
        for (let i = 0; i < beforeChat.length; i++) {
          const imgURL = await Users.findOne({
            where: { id: beforeChat[i].dataValues.send_id },
          });
          // console.log("beforeChat", beforeChat[i].dataValues.send_message);
          let send_time = beforeChat[i].dataValues.createdAt;
          send_time += 9;
          const inputDateString = send_time;
          const inputDate = new Date(inputDateString);
          // 연도에서 끝의 2자리만 가져오기
          const year = inputDate.getFullYear().toString().slice(-2);
          // 월과 일을 두 자리 숫자로 만들고 가져오기
          const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
          const day = inputDate.getDate().toString().padStart(2, "0");
          // 시간과 분을 두 자리 숫자로 만들고 가져오기
          const hours = inputDate.getHours().toString().padStart(2, "0");
          const minutes = inputDate.getMinutes().toString().padStart(2, "0");
          // "YY-MM-DD HH:mm" 형식으로 날짜와 시간을 조합
          const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

          // console.log(formattedDate);
          send_before_chat.push({
            send_id: beforeChat[i].dataValues.send_id,
            send_message: beforeChat[i].dataValues.send_message,
            send_time: formattedDate,
            imgURL: imgURL.imgURL,
          });
        }
        cb({ beforeChat: send_before_chat, chatData: chatroomExist });
      }

      //join(방이름) 해당 방이름으로 없다면 생성. 존재하면 입장
      //socket.rooms에 socket.id값과 방이름 확인가능
      socket.join(roomName);
      //socket은 객체이며 원하는 값을 할당할 수 있음
      socket.room = roomName;
      socket.user = userName;

      socket.to(roomName).emit("notice", `${userName}님이 입장하셨습니다`);

      //채팅방 목록 갱신
      // if (!roomList.includes(roomName)) {
      //   roomList.push(roomName);
      //   //갱신된 목록은 전체가 봐야함
      //   io.emit("roomList", roomList);
      // }

      const usersInRoom = getUsersInRoom(roomName);
      io.to(roomName).emit("userList", usersInRoom);
      cb();
    }
  );

  socket.on("sendMessage", async (message) => {
    const currentDate = new Date();

    // 연도에서 끝의 2자리만 가져오기
    const year = currentDate.getFullYear().toString().slice(-2);

    // 월과 일을 두 자리 숫자로 만들고 가져오기
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    // 시간과 분을 두 자리 숫자로 만들고 가져오기
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    // "YY-MM-DD HH:mm" 형식으로 날짜와 시간을 조합
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    // console.log(formattedDate);
    // console.log(message);
    // console.log(socket.room);
    ChatMessage.create({
      chat_key: socket.room,
      send_id: message.nick,
      send_message: message.message,
    });
    const userImg = await Users.findOne({
      where: { id: message.nick },
    });
    if (message.user === "all") {
      io.to(socket.room).emit(
        "newMessage",
        message.message,
        message.nick,
        formattedDate,
        userImg.imgURL,
        false
      );
    } else {
      io.to(message.user).emit(
        "newMessage",
        message.message,
        message.nick,
        formattedDate,
        userImg.imgURL,
        true
      );
      //자기자신에게 메세지 띄우기
      socket.emit(
        "newMessage",
        message.message,
        message.nick,
        formattedDate,
        userImg.imgURL,
        true
      );
    }
  });

  socket.on("disconnect1", async (userId, roomname, cb) => {
    try {
      socket.leave(roomname);
      let participant = await Chat.findOne({
        where: { roomID: roomname },
      });
      console.log("111111", participant);
      participant = participant.dataValues.participant_id.split(",");
      console.log("222222", participant);
      let participantID = [];
      for (let i = 0; i < participant.length; i++) {
        if (participant[i] != userId) {
          participantID.push(participant[i]);
        }
      }
      const edit_participant = participantID.toString();
      console.log(edit_participant, "sddsdsdss", getUsersInRoom(socket.room));
      await Chat.update(
        { participant_id: edit_participant },
        { where: { roomID: roomname } }
      );
      cb({ result: true });
    } catch (error) {
      console.error(error);
      cb({ result: false });
    }
  });

  function getUsersInRoom(room) {
    const users = [];
    //채팅룸에 접속한 socket.id값을 찾아야함
    const clients = io.sockets.adapter.rooms.get(room);
    console.log(clients);
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
