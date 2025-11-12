import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast'; // ✅ changed import

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [comment, setComment] = React.useState('');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    api
      .get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));

    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, [id]);

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await api.post(`/books/${id}/comments`, {
        userName: user.displayName || user.email,
        userPhoto: user.photoURL || '',
        text: comment,
      });
      const updated = await api.get(`/books/${id}`);
      setBook(updated.data);
      setComment('');
      toast.success('Comment added'); // ✅ updated toast
    } catch (err) {
      toast.error('Failed to add comment'); // ✅ updated toast
    }
  };

  if (loading) return <Loading />;
  if (!book) return <p>Not found</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-72 object-cover rounded"
        />
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-sm">By {book.author}</p>
          <p className="mt-2">{book.summary}</p>
          <p className="mt-2">
            Genre: {book.genre} | Rating: {book.rating}
          </p>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-xl mb-2">Comments</h3>
        {book.comments?.length ? (
          book.comments.map((c, idx) => (
            <div key={idx} className="p-2 border rounded mb-2">
              <div className="flex items-center gap-3">
                {c.userPhoto && (
                  <img
                    src={c.userPhoto}
                    alt={c.userName}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold">{c.userName}</div>
                  <div className="text-sm">{c.text}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </section>

      {user ? (
        <div className="mt-4">
          <textarea
            className="textarea w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
          ></textarea>
          <button
            className="btn btn-sm btn-primary mt-2"
            onClick={handleComment}
          >
            Post Comment
          </button>
        </div>
      ) : (
        <p className="mt-4">Log in to add comments.</p>
      )}
    </div>
  );
}
