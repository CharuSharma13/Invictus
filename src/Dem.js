import axios from 'axios';
import {useState,useEffect} from "react";

function App() {
  var sortable={};
  var freqMap = {};
  var n;
  const [top,setTop]=useState([])
    

  const [dict,setDict]=useState({
    word:"",
    freq:""
  })


  useEffect(()=>{
    setTop(prev=>[...prev,dict])
  },[dict])







  const [data,setData]=useState("")
  function handle(e){
        setData(e.target.value) 
        }

  

  function detail(res){
    var string=res.data;
    var words = string.toLowerCase().replace(/[.]|[,]|[-]|20|1|500/gi, "").split(/\s/);
    //var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });
    // for (const [key, value] of Object.entries(freqMap)) {
    //       console.log(`${key}-> ${value}`);
    //     }
    // console.log( freqMap);
    sortable = Object.fromEntries(
    Object.entries(freqMap).sort(([,a],[,b]) => b-a)
);
  delete sortable[""]; 


  //console.log(sortable);

  n=parseInt(data);




  for(let i=0;i<n;i++){
  console.log(`${Object.keys(sortable)[i]} -> ${sortable[Object.keys(sortable)[i]]}`)



  setDict({
     word:Object.keys(sortable)[i],
     freq:sortable[Object.keys(sortable)[i]]
  })
  
  
  



  // const word={
  //   word:Object.keys(sortable)[i],
  //   freq:sortable[Object.keys(sortable)[i]]
  // };
  // 











  console.log(dict.word)

}


  }



  
  function submit(e){
        e.preventDefault();
        var OPTIONS = {
            url: "https://raw.githubusercontent.com/invictustech/test/main/README.md",
            method: "GET",
            
            headers: {
              "content-type": "json",
            },
          }

        axios(OPTIONS).then(res=>detail(res))
        .catch(err=>console.log(err));
    
    }




  return (
    <div className="App">
      <h1>React App</h1>
      <form  className="search-form" onSubmit={(e)=>submit(e)}>
        
        <input
          type="text"
          placeholder="Enter Number"
          onChange={(e)=>handle(e)}
        />
        <button type="submit" >Submit</button>
      </form>

      
      
      {
        top.map((topWord, i) => {
          return <p key={i}>
            <span>{topWord.word}</span>
            <span>{topWord.freq}</span>
          </p>
        })

      }

    

        
      

    </div>
  );
}

export default App;