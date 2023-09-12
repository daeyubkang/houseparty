const express = require("express");
const db = require("./models");
const app = express();
const PORT = 8000;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const SocketIO = require("socket.io");
require("dotenv").config();

//소켓
const server = http.createServer(app);
const io = SocketIO(server);
const socketRouter = require("./routes/socket");
socketRouter(io);

app.use("/public", express.static(__dirname + "/public"));

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "mySession",
    resave: false, //세션 데이터가 변경되지 않더라도 세션을 다시 저장할 지 여부(defalult: true)
    saveUninitialized: true, // 세션 데이터가 초기화되지 않은 상태에서도 세션을 저장할 지 여부
    //초기화되지 않는 세션 데이터? 세션을 시작한 후 데이터를 저장하지 않는 상태
    cookie: {
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  })
);

//router 분리
const mainRouter = require("./routes/main");
app.use("/main", mainRouter);

const partiesRouter = require("./routes/parties");
app.use("/parties", partiesRouter);

const signinRouter = require("./routes/signin");
app.use("/signin", signinRouter);

const singupRouter = require("./routes/signup");
app.use("/signup", singupRouter);

const chatRouter = require("./routes/chat");
app.use("/chat", chatRouter);

const profileRouter = require("./routes/profile");
app.use("/profile", profileRouter);

const verifyRouter = require("./routes/verify");
app.use("/verify", verifyRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

//
const signup1Router = require("./routes/signup1");
app.use("/signup1", signup1Router);

const signup2Router = require("./routes/signup2");
app.use("/signup2", signup2Router);

const partiesSearchRouter = require("./routes/paritesSearch");
app.use("/partiesSearch", partiesSearchRouter);

const findRouter = require("./routes/find");
app.use("/find", findRouter);

app.use("/public", express.static(__dirname + "/public"));

app.use("/", (req, res) => {
  res.render("index");
});

//오류처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

//db싱크
//force:true 항상 테이블을 삭제 후 재생성
//force:false(default) 테이블이 존재하면 패쓰, 없으면 생성
db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
