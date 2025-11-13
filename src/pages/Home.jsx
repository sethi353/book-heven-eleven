import React from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function Home() {
  const [latest, setLatest] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    api.get('/books?limit=6')
      .then(res => setLatest(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-base-200 dark:bg-gray-900 min-h-screen transition-colors duration-300">

        {/* Dark Mode Toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white text-lg transition-colors duration-300"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative hero bg-base-200 dark:bg-gray-900 rounded-lg p-6 mb-8 overflow-hidden h-[300px] md:h-[400px] lg:h-[400px]">
          <div className="absolute inset-0 z-0">
            <Swiper
              modules={[EffectFade, Autoplay]}
              navigation={false}
              pagination={false}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-full"
            >
              <SwiperSlide>
                <img 
                  src="https://i.ibb.co.com/s9kJLQ63/download-18.jpg" 
                  alt="Banner 1" 
                  className="w-full h-full object-cover brightness-50"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img 
                  src="https://i.ibb.co.com/Wvc4cHBP/download-19.jpg" 
                  alt="Banner 2" 
                  className="w-full h-full object-cover brightness-50"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img 
                  src="https://i.ibb.co.com/VWbTZ3gZ/download-20.jpg" 
                  alt="Banner 3" 
                  className="w-full h-full object-cover brightness-50"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="relative z-10 hero-content flex-col lg:flex-row text-white">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-4xl font-bold">Welcome to Book Haven</h1>
              <p className="py-3">Explore, add, and manage books — built with React, Node, MongoDB & Firebase.</p>
              <div className="flex gap-2">
                <Link to="/all-books" className="btn btn-primary">All Books</Link>
                <Link to="/add-book" className="btn btn-outline">Create Book</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Books */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Latest books</h2>
          {loading ? <Loading /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {latest.map(b => <BookCard key={b._id} book={b} />)}
            </div>
          )}
        </section>

        {/* Top Genres */}
        <section className="mt-8 grid grid-cols-1 gap-6">
          <div className="card p-4 shadow bg-white dark:bg-gray-800 rounded-lg transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-black dark:text-white">Top Genres</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="flex items-center gap-3 p-2 rounded bg-base-100 dark:bg-gray-700 transition-colors duration-300">
                <img src="https://i.ibb.co.com/TqBQN5cd/download-21.jpg" alt="Fantasy" className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-black dark:text-white">Fantasy</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-base-100 dark:bg-gray-700 transition-colors duration-300">
                <img src="https://i.ibb.co.com/QjJ3J93H/download-4.png" alt="Mystery" className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-black dark:text-white">Mystery</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-base-100 dark:bg-gray-700 transition-colors duration-300">
                <img src="https://i.ibb.co.com/TxhsLjRr/images-12.jpg" alt="Non-Fiction" className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-black dark:text-white">Non-Fiction</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-base-100 dark:bg-gray-700 transition-colors duration-300">
                <img src="https://i.ibb.co.com/23zgW3cZ/download-5.png" alt="Romance" className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-black dark:text-white">Romance</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-base-100 dark:bg-gray-700 transition-colors duration-300">
                <img src="https://i.ibb.co.com/Fk0t7r0q/download-22.jpg" alt="Science-Fiction" className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-black dark:text-white">Science-Fiction</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-base-100 dark:bg-gray-700 transition-colors duration-300">
                <img src="https://i.ibb.co.com/Rp7YKp7d/download-23.jpg" alt="Thriller" className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-black dark:text-white">Thriller</span>
              </div>

            </div>
          </div>

          <div className="card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 transform transition duration-500 hover:scale-[1.01] text-center">
            <div className="flex flex-col items-center mb-4">
              <h3 className="text-3xl font-bold text-black dark:text-white tracking-tight">
                Welcome to The Book Haven
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-0 leading-relaxed">
              <strong className="text-indigo-600">The Book Haven</strong> is more than just a website—it's your dedicated sanctuary for all things literary. We understand the joy of a good story and the comfort of a well-organized library. Our platform is meticulously designed to enrich every facet of your reading life, making it simple and inspiring.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
