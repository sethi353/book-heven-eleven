import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { uploadToImgbb } from '../utils/imgbbUpload';
import { toast } from 'react-toastify';

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = React.useState(null);
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    api.get(`/books/${id}`).then(res => setBook(res.data)).catch(console.error);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = book.coverImage;
      if (file) imageUrl = await uploadToImgbb(file);
      const payload = { ...book, coverImage: imageUrl };
      await api.put(`/books/${id}`, payload);
      toast.success('Updated');
      navigate('/my-books');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input input-bordered w-full" value={book.title} onChange={e=>setBook({...book,title:e.target.value})}/>
        <input className="input input-bordered w-full" value={book.author} onChange={e=>setBook({...book,author:e.target.value})}/>
        <input className="input input-bordered w-full" value={book.genre} onChange={e=>setBook({...book,genre:e.target.value})}/>
        <input type="number" className="input input-bordered w-full" value={book.rating} onChange={e=>setBook({...book,rating:e.target.value})}/>
        <textarea className="textarea textarea-bordered w-full" value={book.summary} onChange={e=>setBook({...book,summary:e.target.value})}/>
        <input type="file" onChange={e=>setFile(e.target.files[0])}/>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
