const express=require("express");
const app=express();

const http=require("http");
const cors=require("cors");
const { Server }=require("socket.io");


app.use(cors());
const server=http.createServer(app);
const io= new Server(server,{
 cors:{
 origin:"http://localhost:3000",
 method:["GET","POST"],
 },
});
io.on("connection",(socket)=>{
 console.log(`User Connected : ${socket.id}`);
 socket.on("join_room",(data)=>{
  socket.join(data);
  console.log(`User joined with the user id ${socket.id} and Room id ${data}`);


 });
 socket.on("send_msg",(data)=>{
  socket.to(data.Room).emit("receive_message",data);


  // socket.to(data.Room).emit("receive_msg",data); 
 });

 socket.on("disconnect",(socket)=>{
  console.log("User disconnected",socket.id);

 });

})
server.listen(3002 ,()=>{
 console.log("Running successfully");

});

