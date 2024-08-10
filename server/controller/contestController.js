
import Pusher from 'pusher';
import Contest from '../models/contestModel.js';
const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true

});




export async function createContest(req, res)  {
    const { name, questions, startTime, endTime } = req.body;
    const contest = await Contest.create({
        name,
        questions,
        startTime,
        endTime,
    });
    
    pusher.trigger('contests', 'update', { contest });

    res.status(201).json(contest);
};

export async function getContests (req, res)  {
    console.log('getContests');
    const contests = await Contest.find({})
        .populate('participants', 'username')
        .populate('questions', 'title');
    res.json(contests);
};


export async function getContestById (req, res)  {
    const contest = await Contest.findById(req.params.id)
        .populate('participants', 'username')
        .populate('questions', 'title');
    res.json(contest);
};
