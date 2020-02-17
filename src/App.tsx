import React,{useState, useEffect} from 'react';
import usePagination from './usePagination';
import './App.css';

const App: React.FC = () => {
  const [facts, setFacts] = useState([])
  const {pageSize, setPageSize, currentPage, setCurrentPage, goLeft, goRight, pages } = usePagination({}) 

  useEffect(()=>{
    async function getFacts(){
      const result = await fetch(`https://official-joke-api.appspot.com/random_ten`)
      const result2  = await result.json()
      setFacts(result2)
    }
    getFacts()
  },[currentPage])
  return (
    <div className="App">
      <ul className="facts">
        {facts.map(({ id, type, setup, punchline }, idx) => <Quote key={id} {...{ id, type, setup, punchline}}/>)}
      </ul>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}
function noop(){

}

interface pagination{
  pageSize?: number;
  setPageSize ?: (id:number)=> void;
  currentPage: number;
  setCurrentPage: (id: number)=> void;
  goLeft ?: ()=>void;
  goRight ?: ()=>void;
  pages : number[];
}
const Pagination: React.FC<pagination> = ({ pageSize = 10, setPageSize = null, currentPage = 1, setCurrentPage , goLeft = null, goRight = null, pages = [] }) => {
  return (
    <div className="flex pagination-container">
      <ul className="pages">
        {pages.map(p=>
          <li onClick={e=>setCurrentPage(p)} className={`page-number ${currentPage === p ? 'active' : ''}`}>{p}</li>
        )}
      </ul>
    </div>
  )
}

interface quote{
  id : number;
  type : string;
  setup: string
  punchline: number;
}

const Quote: React.FC<quote> = ({ id, type, setup, punchline})=>{
  const [active, setActive]  = useState(false)
  return(
    <li className="fact" onClick={e=>setActive(true)}>
      <h5>{setup}</h5>
      {active && <div>{punchline}</div>}
    </li>
  )
}

export default App;
