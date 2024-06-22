const initialstate={
}

const news=(state=initialstate,action)=>{
    switch (action.type) {
        case 'ADD':
            const newdata=action.payload
            console.log(newdata);
            state=newdata;
            return state
        default:
            return state
    }
}

export default news