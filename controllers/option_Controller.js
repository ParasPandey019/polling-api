const Option = require('../models/options');
const Question = require('../models/questions');


module.exports.create = async function(req,res){
    // console.log(req.body,req.params.id);

    const opt = await Option.create({
        option:req.body.content,
        question:req.params.id,
    });
   
    const updateOpt = await Option.findByIdAndUpdate(opt._id,{"add_vote":`http://localhost:8000/api/v1/options/${opt._id}/add_vote`});
    updateOpt.save();

    const question = await Question.findById(req.params.id);
    if(question){
        question.options.push(updateOpt);
        question.save();
        // console.log(question);
        res.send(question);
    }
    else{
        res.send('question does not exists');
    }
}

module.exports.addVote = async function(req,res){
    // console.log(req.params.id);
    const option = await Option.findByIdAndUpdate(req.params.id,{ $inc: { vote: 1 }});

    if(option){
        await option.save();
        // console.log(option);
        res.send(option);
    }
    else{
        res.send('option does not exits')
    }
}

module.exports.delete = async function(req,res){
    // console.log('id',req.params.id);
    const option = await Option.findById(req.params.id);

    if(option){
        const quesId = option.question;
       
        const question = await Question.findByIdAndUpdate(quesId,{$pull:{options:req.params.id}});

        await Option.findByIdAndDelete(req.params.id);

        // console.log(question);
        res.send('option deleted');
    }
    else{
        res.send('id does not match');
    }
}
