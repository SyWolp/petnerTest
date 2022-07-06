function getTitle(){
  const response = fetch("https://petner.kr/api/v6/publics");
  return response.then(res => res.json());
}

(async function main() { 
  let info;
  let mainInfo = [];
  let contentBox = document.querySelector(".contentBox");
  let leftButton = document.querySelector(".leftButton");
  let rightButton = document.querySelector(".rightButton");
  try {
    info = await getTitle();
    mainInfo.push(...info);
  }
  catch(error){
    console.log(error);
  }
  console.log(mainInfo);
  let infoPlusHTML = [];
  for(let i = 0; i < mainInfo.length; i++) {
    infoPlusHTML.push(`
    <div class="petnerContent">
      <div class="contentHeader">
        <div class="contentHeaderLeft">
          <img class="petners" src="${mainInfo[i].petner.image}" alt="펫시터님">
        </div>
        <div class="contentHeaderRight">
          <h5 class="petnerName">${mainInfo[i].petner.name}<h5>
          <div>😀 전문펫시터</div>
        </div>
      </div>
      <div class="cutePet">
        <img class="cutePetImg" src="${mainInfo[i].image}" alt="반려동물들">
      </div>
      <footer class="contentFooter">
        <div class="times">~시간 전</div>
        <div class="petName">${mainInfo[i].companion.name}</div>
      </footer>
    </div>`);
  }
  for(let i = 0; i < infoPlusHTML.length; i++) {
    contentBox.innerHTML += infoPlusHTML[i];
  }
  let clickWidth = 0;
  rightButton.addEventListener("click",()=>{
    if(clickWidth <= -1280) {
      clickWidth = 0;
      contentBox.style.transform = `translate(${clickWidth},0)`;
    }else {
      clickWidth = clickWidth - 128;
      contentBox.style.transform = `translate(${clickWidth}px,0)`;
    }
  })
  leftButton.addEventListener("click",()=>{
    console.log(clickWidth)
    if(clickWidth !== 0) {
      clickWidth = clickWidth + 128;
      contentBox.style.transform = `translate(${clickWidth}px,0)`;
    }else {
      clickWidth = -1280;
      contentBox.style.transform = `translate(${clickWidth}px,0)`;
    }
  })
  
})();