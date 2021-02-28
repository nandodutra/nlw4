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

  const { user_id  } = req.body

  const userCollection = db.collection('challenges')

  const user = await userCollection.findOne({ user_id: user_id })

  try {
    if (!user) {
      await userCollection.insertOne({ ...req.body })

      return res.json({ status: 'created' })
    } else {
      await userCollection.updateOne({ user_id: user_id }, { $set: {...req.body} })
      return res.json({ status: 'updated' })
    }
  } catch(err) {
    console.log('err', err)
    return res.status(400).json({ err: err.message })
  }
}