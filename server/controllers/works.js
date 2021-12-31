const Work = require("../models/work");

async function getWorks(req, res) {
    try {
        const works = await Work.find();
        res.json({ works });
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function getWork(req, res) {
    try {
        const workId = req.params["work_id"];
        const work = await Work.findById(workId);
        res.json({ work });
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function updateWork(req, res) {
    try {
        const workId = req.params["work_id"];
        const work = req.body.work;
        const oldWork = await Work.findByIdAndUpdate(workId, work);
        res.json({ oldWork });
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function deleteWork(req, res) {
    try {
        const workId = req.params["work_id"];
        const oldWork = await Work.findByIdAndDelete(workId);
        res.json({ oldWork });
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

module.exports = {
    getWorks,
    getWork,
    updateWork,
    deleteWork,
};
