import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartProduct } from "@/Components";

const Cart = () => {
  const goBack = () => {
    const navigate = useNavigate();
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <div className="w-full h-auto  py-2 px-2 flex justify-start flex-col items-center">
        <div className="md:w-[80%] w-full ">
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center items-start">
            <h4 className="text-sm font-base text-gray-500">
              Home / <span className="text-black">Cart</span>
            </h4>
            <div
              className="custom-flex sm:text-base text-sm font-normal text-black cursor-pointer gap-1 hover:gap-2 duration-100"
              onClick={goBack}>
              <IoIosArrowBack className="text-black" />
              Back to Previous Page
            </div>
          </div>
        </div>
        <div className="w-full text-center md:h-32 h-24 bg-orange-100 custom-flex">
          <h2 className="main-heading-font md:text-4xl text-xl text-gray-800 font-bold">
            Your Cart
          </h2>
        </div>
        <div className="md:w-[80%] w-full ">
          <div className="w-full custom-flex flex-col gap-2">
            <CartProduct
              product={{
                _id: "6637d92279917943aa981a6e",
                category: "662fd7aeef0b27b2064e5088",
                description: "Baldric Jp 13693 Tan Soft Tumb Lea",
                mainImage: {
                  url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936095/ezyjqbqmyiq89qlhpcua.jpg",
                  public_id: "ezyjqbqmyiq89qlhpcua",
                  _id: "6637d92279917943aa981a6f",
                },
                color: "Tan",
                size: [6, 9],
                name: "REEBOK",
                owner: "66156788310b0b4660966b38",
                price: 5000,
                stock: 31,
                subImages: [
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936096/vzkgs73ickvrkg3vgc5l.jpg",
                    public_id: "vzkgs73ickvrkg3vgc5l",
                    _id: "6637d92279917943aa981a70",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936097/ni94c0klqqic5w7ikcty.jpg",
                    public_id: "ni94c0klqqic5w7ikcty",
                    _id: "6637d92279917943aa981a71",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936097/s1jmv5lilam8psmrsekz.jpg",
                    public_id: "s1jmv5lilam8psmrsekz",
                    _id: "6637d92279917943aa981a72",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936098/sk54htdjx9odmsk5xg6c.jpg",
                    public_id: "sk54htdjx9odmsk5xg6c",
                    _id: "6637d92279917943aa981a73",
                  },
                ],
                createdAt: "2024-05-05T19:08:18.839Z",
                updatedAt: "2024-05-08T09:47:06.834Z",
                __v: 0,
              }}
            />
            <CartProduct
              product={{
                _id: "6637d92279917943aa981a6e",
                category: "662fd7aeef0b27b2064e5088",
                description: "Baldric Jp 13693 Tan Soft Tumb Lea",
                mainImage: {
                  url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936095/ezyjqbqmyiq89qlhpcua.jpg",
                  public_id: "ezyjqbqmyiq89qlhpcua",
                  _id: "6637d92279917943aa981a6f",
                },
                color: "Tan",
                size: [6, 9],
                name: "REEBOK",
                owner: "66156788310b0b4660966b38",
                price: 5000,
                stock: 31,
                subImages: [
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936096/vzkgs73ickvrkg3vgc5l.jpg",
                    public_id: "vzkgs73ickvrkg3vgc5l",
                    _id: "6637d92279917943aa981a70",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936097/ni94c0klqqic5w7ikcty.jpg",
                    public_id: "ni94c0klqqic5w7ikcty",
                    _id: "6637d92279917943aa981a71",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936097/s1jmv5lilam8psmrsekz.jpg",
                    public_id: "s1jmv5lilam8psmrsekz",
                    _id: "6637d92279917943aa981a72",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936098/sk54htdjx9odmsk5xg6c.jpg",
                    public_id: "sk54htdjx9odmsk5xg6c",
                    _id: "6637d92279917943aa981a73",
                  },
                ],
                createdAt: "2024-05-05T19:08:18.839Z",
                updatedAt: "2024-05-08T09:47:06.834Z",
                __v: 0,
              }}
            />
            <CartProduct
              product={{
                _id: "6637d92279917943aa981a6e",
                category: "662fd7aeef0b27b2064e5088",
                description: "Baldric Jp 13693 Tan Soft Tumb Lea",
                mainImage: {
                  url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936095/ezyjqbqmyiq89qlhpcua.jpg",
                  public_id: "ezyjqbqmyiq89qlhpcua",
                  _id: "6637d92279917943aa981a6f",
                },
                color: "Tan",
                size: [6, 9],
                name: "REEBOK",
                owner: "66156788310b0b4660966b38",
                price: 5000,
                stock: 31,
                subImages: [
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936096/vzkgs73ickvrkg3vgc5l.jpg",
                    public_id: "vzkgs73ickvrkg3vgc5l",
                    _id: "6637d92279917943aa981a70",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936097/ni94c0klqqic5w7ikcty.jpg",
                    public_id: "ni94c0klqqic5w7ikcty",
                    _id: "6637d92279917943aa981a71",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936097/s1jmv5lilam8psmrsekz.jpg",
                    public_id: "s1jmv5lilam8psmrsekz",
                    _id: "6637d92279917943aa981a72",
                  },
                  {
                    url: "http://res.cloudinary.com/dcvb5vgyf/image/upload/v1714936098/sk54htdjx9odmsk5xg6c.jpg",
                    public_id: "sk54htdjx9odmsk5xg6c",
                    _id: "6637d92279917943aa981a73",
                  },
                ],
                createdAt: "2024-05-05T19:08:18.839Z",
                updatedAt: "2024-05-08T09:47:06.834Z",
                __v: 0,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
