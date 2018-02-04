var APP_ID = '9OjuxqtJW77d99IuXSp1Eug1-gzGzoHsz';
var APP_KEY = 't9H4TMWKyXzEP2xn2wW1oYzt';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('MeLeaveWord');
query.find()
  .then(function (messages) {
    let array = messages.map((item) => item.attributes)
    array.forEach((item) => {
      let li = document.createElement('li')
      li.innerText = `Name：${item.name}
      Content：${item.word}
      ${item.date}` 
      let messageList = document.querySelector('#messageList')
      messageList.appendChild(li)
    });

  })

  let myForm = document.querySelector('#postMessageForm')
  myForm.addEventListener('submit', function(e){
    e.preventDefault()
  let word = myForm.querySelector('input[name=word]').value
  let name = myForm.querySelector('input[name=name]').value
  let date = new Date().toLocaleString();
  var TestObject = AV.Object.extend('MeLeaveWord');
  var message = new TestObject();
  message.save({
    'name': name,
    'word': word,
    'date':date
  }).then(function (object) {
    let li = document.createElement('li')
    li.innerText = `Name：${object.attributes.name} 
    Content： ${object.attributes.word}
     ${object.attributes.date}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    myForm.querySelector('input[name=word]').value = ''
    myForm.querySelector('input[name=name]').value = ''

    console.log(object)
  })

})



// //创建TestObject表
// var TestObject = AV.Object.extend('TestObject');
// //在表中创建一行数据
// var testObject = new TestObject();
// testObject.save({
//   //数据内容为 words: 'Hello World!' 保存
//   //如果保存成功，运行alert('LeanCloud Rocks!');
//   words: 'Hello World!'
// }).then(function (object) {
//   alert('LeanCloud Rocks!');
// })


