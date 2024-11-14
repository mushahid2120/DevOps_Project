const obj={ data: 'ddfd', Submit: 'Submit' };
const {data}=obj;

testing(obj.data);
function testing(data){
    console.log("Trimed Data: "+ data);
}