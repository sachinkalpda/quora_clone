
module.exports.getDate = function(current,created){
        let currentDate = new Date(current);
        let createdDate = new Date(created);
        let result = currentDate.getUTCMilliseconds() - createdDate.getUTCMilliseconds();
        result = result/60000;
        if(result >= 60){
            if(result/60 >= 24){
                return (result/60)/24;
            }else{
                return result/60;   
            }
        }
}