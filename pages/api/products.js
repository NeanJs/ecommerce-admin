import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  if (method == "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    }
    res.json(await Product.find());
  }
  if (method == "POST") {
    const { name, description, price, images } = req.body;
    const productBody = await Product.create({
      name,
      description,
      price,
      images,
    });
    res.json(productBody);
  }
  if (method == "PUT") {
    const { name, description, price, _id, images } = req.body;
    await Product.updateOne({ _id }, { name, description, price, images });
    res.json(true);
  }

  if (method == "DELETE") {
    const _id = req.query?.id;
    await Product.findByIdAndDelete(_id);
    res.json({ message: "Product deleted successfully!" });
  }
}
