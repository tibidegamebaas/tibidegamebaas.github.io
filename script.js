var dayElem = document.getElementById("day");
var monthElem = document.getElementById("month");
var yearElem = document.getElementById("year");
var hourElem = document.getElementById("hour");
var minuteElem = document.getElementById("minute");
var secondElem = document.getElementById("second");
var ElemArray = [secondElem, minuteElem, hourElem, dayElem, monthElem, yearElem];

window.addEventListener("DOMContentLoaded", () => {
  var g = 0;
  var init = 1;
  function loop() {
    globalThis.d = new Date();
    ChangeItem(ElemArray[0]);
    if (globalThis.d.getSeconds() == 0 || init == 1){
      ChangeItem(ElemArray[1]);
      if (globalThis.d.getMinutes() == 0 || init == 1){
        ChangeItem(ElemArray[2]);
        if (globalThis.d.getHours() == 0 || init == 1){
          ChangeItem(ElemArray[3]);
          if (globalThis.d.getDay() == 0 || init == 1){
            ChangeItem(ElemArray[4]);
            if (globalThis.d.getMonth() == 0 || init == 1){
              ChangeItem(ElemArray[5]);
              init = 0;
            }
          }
        }
      }
    }
      function ChangeItem(elem) {
        const children = elem.children;
        const proxy = new Proxy(children, {
          get(target, prop) {
            if (!isNaN(prop)) {
              prop = parseInt(prop);
              if (prop < 0) {
                prop += target.length;
              }
            }
            return target[prop];
          }
        });
        showUp(proxy[g - 4]);
        showCenter(proxy[g - 3]);
        showDown(proxy[g - 2]);
        showBack(proxy[g - 1]);
        showNone(proxy[g]);
      }
    g = ((g + 1) % 5);
  }
  function showUp(elem) {
    elem.classList.remove('center','down','back','none');
    elem.classList.add('up');
    setInnerHTML(elem, -1);
    };
  function showCenter(elem) {
    elem.classList.remove('up','down','back','none');
    elem.classList.add('center');
    setInnerHTML(elem);
  }
  function showDown(elem) {
    elem.classList.remove('up','center','back','none');
    elem.classList.add('down');
    setInnerHTML(elem, 1);
  }
  function showBack(elem) {
    elem.classList.remove('up','center','down','none');
    elem.classList.add('back');
    setInnerHTML(elem, 2);
  }
  function showNone(elem) {
    elem.classList.remove('up','center','down','back');
    elem.classList.add('none');
  }
  function setInnerHTML(elem, offset=0){
    if(elem.classList.contains("year")){
      var content = globalThis.d.getFullYear() + offset;
      elem.innerHTML = content.toString().length == 1 ? "0"+content : content
    }
    if(elem.classList.contains("month")){
      var content = (globalThis.d.getMonth() + offset + 14) % 13;
      if(content==0){content=1}
      elem.innerHTML = content.toString().length == 1 ? "0"+content : content;
    }
    if(elem.classList.contains("day")){
      var content = (globalThis.d.getDate() + offset +32) % 32;
      if(content==0){content=1}
      elem.innerHTML = content.toString().length == 1 ? "0"+content : content;
    }
    if(elem.classList.contains("hour")){
      var content = (globalThis.d.getHours() + offset + 24) % 24;
      elem.innerHTML = content.toString().length == 1 ? "0"+content : content;
    }
    if(elem.classList.contains("minute")){
      var content = (globalThis.d.getMinutes() + offset +60) % 60;
      elem.innerHTML = content.toString().length == 1 ? "0"+content : content;
    }
    if(elem.classList.contains("second")){
      var content = (globalThis.d.getSeconds() + offset + 60) % 60;
      elem.innerHTML = content.toString().length == 1 ? "0"+content : content;
    }
  }
  loop();
  setInterval(loop, 1000);
});
