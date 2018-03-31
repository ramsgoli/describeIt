const { User, Submission, Vote } = require('../db')
/*
 returns true if every player in this game has a submission
 */
const hasEveryoneSubmitted = async (game) => {
    try {
        const players = await User.findAll({
            where: {
                gameId: game.id
            }
        })

        for (let i = 0; i < players.length; i++) {
            const submission = await Submission.findOne({
                where: {
                    userId: players[i].id
                }
            })

            if (!submission) {
                return false;
            }
        }
        return true;
    } catch (err) {
        // shouldn't happen but oh well..
        return false;
    }
}

const hasEveryoneVoted = async gameId => {
    try {
        const players = await User.findAll({
            where: {
                gameId
            }
        })

        for (let i = 0; i < players.length; i++) {
            const vote = await Vote.findOne({
                where: {
                    userId: players[i].id
                }
            })

            if (!vote) {
                return false;
            }
        }
        return true;
    } catch (err) {
        return false;
    }
}

const calculateWinners = async gameId => {
    let results = {};
    results.players = [];

    try {
        
        const users = await User.findAll({
            where: {
                gameId
            }
        });

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            let record = {};
            record.name = user.name;
            record.numCorrect = 0;
            record.votes = [];

            const votes = await Vote.findAll({
                where: {
                    userId: user.id
                },
                include: [{
                    model: Submission
                },
                {
                    model: User,
                    as: 'userVotedFor'
                }]
            });
            for (let j = 0; j < votes.length; j++) {
                const vote = votes[j];

                if (vote.userVotedForId == vote.submission.userId) {
                    record.numCorrect += 1;
                    record.votes.push({
                        text: vote.submission.text,
                        votedFor: vote.userVotedFor.name,
                        correct: true
                    });
                } else {
                    record.votes.push({
                        text: vote.submission.text,
                        votedFor: vote.userVotedFor.name,
                        correct: false
                    });
                }
            }
            results.players.push(record);
        }

        let winners = [];
        const usersSorted = results.players.sort((a,b) => b['numCorrect']-a['numCorrect']);
        winners.push(usersSorted[0].name);
        for (let i = 1; i < usersSorted.length; i++) {
            if (usersSorted[i].numCorrect == usersSorted[0].numCorrect) {
                winners.push(usersSorted[i].name);
            }
        }

        results['winners'] = winners
        
        return results;

    } catch (err) {
        console.error(err);
        return results;
    }
}
module.exports = {
    hasEveryoneSubmitted,
    hasEveryoneVoted,
    calculateWinners,
}
