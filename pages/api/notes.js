// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).send([
    {
      id: `Kodak ColorPlus${Date.now()}`,
      title: 'Kodak ColorPlus',
      isCompleted: false
    },
    {
      id: `Fujifilm CK40${Date.now()}`,
      title: 'Fujifilm CK40',
      isCompleted: true
    }]
  )
}
