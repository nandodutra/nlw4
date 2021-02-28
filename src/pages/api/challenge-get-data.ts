import { MongoClient, Db } from 'mongodb'
import { NowRequest, NowResponse } from '@vercel/node'
import url from 'url'

let cachedDb: Db = null

 async function connectDatabase(uri: string): Db {
  if (cachedDb) return cachedDb

  const clienteDb = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const dbName = url.parse(uri).pathname.substr(1)
  const db = clienteDb.db(dbName)
  cachedDb = db

  return db
}

export default async (req: NowRequest, res: NowResponse) => {
  const db = await connectDatabase(process.env.MONGODB_STRING_CONNECTION)

  const { user_id } = req.query

  const userCollection = db.collection('challenges')

  const user = await userCollection.findOne({ user_id: user_id })

  if (user) {
    const { level, currentExperience, challengesCompleted } = user

    return res.json({ 
      level,
      currentExperience, 
      challengesCompleted 
    })
  } else {
    return res.json({ 
      level: 1,
      currentExperience: 0, 
      challengesCompleted: 0
    })
  }
}