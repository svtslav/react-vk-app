const compose = (...funcs) => (compoment) => 
  funcs.reduceRight(
    (prevValue, f) =>  f(prevValue), 
    compoment
  ); 

export default compose;