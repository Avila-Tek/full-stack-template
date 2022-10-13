export default function handler(req, res) {
  console.log(JSON.stringify(process.env, null, 2));
  res.status(200).json({ name: 'John Doe' });
}
