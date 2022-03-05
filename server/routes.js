const express = require("express")
const router = express.Router()
const RegestryUsers = require("./regestry/RegUsers")

router.get("/regestry", async (req, res) => {
	const regUser = await RegestryUsers.find()
	res.send(regUser)
})
router.post("/regestry", async (req, res) =>{
	const post = new RegestryUsers({
		id: req.body.id,
		username: req.body.username,
		password: req.body.password
	})
	await post.save()
	res.send.post
})

module.exports = router