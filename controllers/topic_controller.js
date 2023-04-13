const Topic = require('../models/topic');
module.exports.add = async function(req,res){
    try {
        const topic = await Topic.create({
            name : req.body.topic,
            user : req.user._id,
        });
        if(topic){
            req.flash('success','Topic Added');
            return res.redirect('back');
        }else{
            req.flash('error','Something Went Wrong!');
            return res.redirect('back');
        }
        
    } catch (err) {
        console.log('Error topic',err);
        return;
        
    }
}


module.exports.all = async function(req,res){
    try {
        let topics = await Topic.find({});
        if(topics){
            return res.json(200,{
                'message': 'Success',
                'topics' : topics
            })
        }else{
            return res.json(200,{
                'message': 'Error',
                'topics' : []
            });

        }
        
        
    } catch (err) {
        console.log('Error topic',err);
        return;
        
    }
}