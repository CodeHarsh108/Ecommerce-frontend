import ProductCard from "./shared/ProductCard";
const products = [
    {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "iPhone 13 Pro Max",
        description:
          "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
        specialPrice: 720,
        price: 780,
      },
      {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Samsung Galaxy S21",
        description:
          "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
        specialPrice: 699,
        price: 799,
      },
      {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Google Pixel 6",
        description:
          "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
        price: 599,
        specialPrice: 400,
      }
];


const about = () => {
    return(
      <div className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen">
        <h1 className="text-slate-900 text-5xl font-extrabold text-center mb-14 tracking-tight drop-shadow-lg">
          About Us
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-xl mb-6 text-slate-700 leading-relaxed">
              Welcome to our e-commerce store! We are dedicated to providing the
              best products and services to our customers. Our mission is to offer
              a seamless shopping experience while ensuring the highest quality of
              our offerings.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <img
              src="https://embarkx.com/sample/placeholder.png"
              alt="About Us"
              className="w-80 h-80 object-cover rounded-2xl shadow-xl border-4 border-blue-100 transform transition-transform duration-300 hover:scale-105 hover:rotate-2"
            />
          </div>
        </div>

        <div className="py-10 space-y-10">
          <h1 className="text-slate-900 text-4xl font-bold text-center mb-8 tracking-tight">
            Our Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <ProductCard 
                key={index}
                image={product.image}
                productName={product.productName}
                description={product.description}
                specialPrice={product.specialPrice}
                price={product.price}
                about
              />
            ))}
          </div>
        </div>
      </div>
    );
}
export default about;