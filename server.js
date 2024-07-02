const express = require('express');
const app = express();
const port = 3000;

// 静态文件服务
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Timestamp microservice listening at http://localhost:${port}`);
});

app.get('/api/timestamp/:date?', (req, res) => {
  const { date } = req.params;
  
  let parsedDate;
  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  }
});
