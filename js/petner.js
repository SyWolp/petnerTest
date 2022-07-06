function getTitle(){
  const response = fetch("https://petner.kr/api/v6/publics");
  return response.then(res => res.json());
}

(async function main() { 
  let text;
  let a = [];
  try {
    text = await getTitle();
    a.push(...text);
  }
  catch(error){
    console.log(error);
  }
  console.log(text);
})();