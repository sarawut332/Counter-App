const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

// function Counter(props) {
//     const {item : {id, number}, hdlUpdate} = props
function Counter( {item : {id, number}, hdlUpdate ,hdlDelete}) {

//เมื่อกดปุ่ม X ให้ลบ Task Counter
  return (
   <div className='counter'>
      <button className='btn-dec' onClick = {()=>hdlUpdate(id,-1)}> - </button>
      <h3>{number}</h3>
      <button className='btn-inc' onClick = {()=>hdlUpdate(id,1)}> + </button>
      <button className='btn-clr' onClick = {()=>hdlUpdate(id,-number)}> C </button>
      <button className='btn-rem' onClick={hdlDelete}> X </button>
   </div>
  )
//    <div className='counter'>
//       <button onClick = {()=>props.hdlUpdate(props.item.id,-1)}> - </button>
//       <h3>{props.item.number}</h3>
//       <button onClick = {()=>props.hdlUpdate(props.item.id,1)}> + </button>
//       <button onClick = {()=>props.hdlUpdate(props.item.id,-props.item.number)}> C </button>
//    </div>
//   )
}

//ให้ Sum เปลี่ยนค่าไปตามจำนวนที่กดปุ่ม โดยมีค่าเริ่มต้นที่ 0
function SumInfo({ total, color, size })  {
    const stTitle = {
      color : color,
      fontSize : size === 'big' ? '50px' : '40px'
    }
    
    return (
      <div className='suminfo'>
        <h1 style={stTitle}>Sum = {total}</h1>
      </div>
    )
  }
  

  function App() {
    const [counters, setCounters] = React.useState([{ id: 1, number: 0}]);
  
    const hdlUpdate = (id, num) => {
      const cloneCounters = [...counters];
      const idx = cloneCounters.findIndex(el => el.id === id);
      if (cloneCounters[idx].number + num < 0) return;
      cloneCounters[idx].number += num;
      setCounters(cloneCounters);
    }
  
    const getTotal = () => {
      return counters.reduce((acc, curr) => acc + curr.number, 0);
    }
  
    const hdlAddCounter = () => {
      let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
      const cloneCounters = [...counters];
      cloneCounters.push({id: newId, number: 0});
      setCounters(cloneCounters);
    }
  
    const hdlDeleteCounter = (idToDelete) => {
      const updatedCounters = counters.filter(counter => counter.id !== idToDelete);
      setCounters(updatedCounters);
    }
  
    return (
      <>
        <h1 className='text-center'>Codecamp Academy 01</h1>
        <button className='btn-add' onClick={hdlAddCounter}>Add Counter</button>
        <SumInfo total={getTotal()} color="red" size="mediem"/> 
        {counters.map(el => (
            <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlDelete={() => hdlDeleteCounter(el.id)}/>
        ))}
      </>
    )
  }
  