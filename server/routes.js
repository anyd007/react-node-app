const express = require("express")
const router = express.Router()
const RegestryUsers = require("./regestry/RegUsers")
const UsersData = require("./usersData/UsersData")


//ta metoda zaakceptuje punkt końcowy rutingu, a program obsługi trasy określi, jakie dane powinny zostać wysłane do klienta. 
//W tym przypadku pobierzemy wszystkie nasze posty ze znaleziskiem z naszego modelu i wyślemy wynik metodą res.send.
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
router.get("/loginUserDatabase", async (req, res)=>{
	const UserDataBase = await UsersData.find()
	res.send(UserDataBase)
})
router.post("/loginUserDatabase", async (req, res)=>{
	const post = new UsersData({
		id: req.body.id,
		playerName: req.body.playerName,
		playerClub: req.body.playerClub,
		position: req.body.position,
		highScore: req.body.highScore
	})
	await post.save()
	res.send.post
})
router.delete("/loginUserDatabase/:id", async (req,res)=>{
	const result = await UsersData.deleteOne({_id: req.params.id})
	res.send(result)
})

module.exports = router