export function checkValidImputsReg(x,y,z){
    if(x==y && x!='' && y!='' && z != ''){
       return true
    }else{
        return false
    }
}
export function validInputs(val){
    
    if((val || []).length === 0){
        return true;
    }else{
        return false;
    }
}
