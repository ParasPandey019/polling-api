const Question = require('../models/questions');
const Option = require('../models/options');



module.exports.create = async function(req,res){
    // console.log(req.body);
    const question = await Question.create(req.body);
    question.save();
    return res.send(question);
}



module.exports.showDetails = async function(req,res){
    // console.log(req.params.id);
    const question = await Question.findById(req.params.id).populate('options');
    if(question){
        res.send(question);
    }
    else{
        res.send("id does not match");
    }
}



module.exports.deleteQuestion = async function(req,res){
    const question = await Question.findById(req.params.id).clone().catch(function(err){ console.log(err)});
    if(question){
        await Question.deleteOne(req.params.id).clone().catch(function(err){ console.log(err)});
        await Option.deleteMany({question:req.params.id}).clone().catch(function(err){ console.log(err)});
            res.send("question deleted");
    }
    else{
        res.send('question not in database');
    }
}
