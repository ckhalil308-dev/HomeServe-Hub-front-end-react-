import React, { useState, useEffect } from 'react';
import { Star, Send, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { addCommentToService, getCommentsByServiceId } from '../../../api/Comments.api';
import Pagination from '../admin/Pagination';
import { useUser } from '../contexte/context';


function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [generalError, setGeneralError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredNote, setHoveredNote] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
    const { user } = useUser();

  const [commentData, setCommentData] = useState({
    service: id,
    note: 0,
    contenu: ''
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByServiceId(id, page);
        console.log('Commentaires récupérés:', data);
        setComments(data.commentaires || []);
        setTotalPages(data.totalPages || 1);
        setTotalComments(data.totalCommentaires || 0);
        setAverageRating(data.avgNote || 0);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchComments();
  }, [id, page, averageRating]);

  const handleAddComment = async () => {
    if (commentData.note === 0 || !commentData.contenu.trim()) {
      setGeneralError("Veuillez sélectionner une note et écrire un message.");
      return;
    }

    setIsSubmitting(true);
    setGeneralError('');

    try {
      const response = await addCommentToService(id, commentData);
      ;
       const data = await getCommentsByServiceId(id, page);
      setAverageRating(data.avgNote || 0);
      
    
      const instantComment = {
        contenu: commentData.contenu,
        note: commentData.note,
        auteur: response.auteur || { 
          prenom: "Vous", 
          nom: "" 
        }
      };

      setComments((prev) => [instantComment, ...prev]);
      setTotalComments((prev) => prev + 1);
      setCommentData({ service: id, note: 0, contenu: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setGeneralError(error.response?.data?.message || 'Erreur lors de la publication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Avis clients</h2>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-yellow-700">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-slate-500 font-medium">{totalComments} avis</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* LIST SECTION */}
        <div className="lg:w-2/3 order-2 lg:order-1">
          {comments.length > 0 ? (
            <div className="space-y-12">
              {comments.map((comment, idx) => (
                <div key={comment._id || idx} className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-11 w-11 shrink-0 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                      {comment.auteur?.prenom?.[0] || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-slate-900 capitalize">
                          {comment.auteur?.prenom} {comment.auteur?.nom}
                        </p>
                        {!comment._id && (
                          <span className="text-[10px] font-bold uppercase text-teal-600 tracking-wider">
                            À l'instant
                          </span>
                        )}
                      </div>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < comment.note ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed mt-3 text-base">
                        {comment.contenu}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 border-b border-slate-50 w-full"></div>
                </div>
              ))}
              <div className="pt-8">
                <Pagination currentPage={page} setPage={setPage} totalPages={totalPages} />
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
              <FileText className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">Aucun avis pour le moment.</p>
            </div>
          )}
        </div>
        {user && user.role === 'client' && (
          <>
            {/* FORM SECTION */}
            <div className="lg:w-1/3 order-1 lg:order-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sticky top-8 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 text-xl">Donner mon avis</h3>
                
                {generalError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl flex items-center gap-2 text-sm">
                    <AlertCircle size={16} /> {generalError}
                  </div>
                )}

                {showSuccess && (
                  <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} /> Merci pour votre message !
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Votre note</label>
                    <div className="flex gap-2" onMouseLeave={() => setHoveredNote(0)}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setCommentData({ ...commentData, note: star })}
                          onMouseEnter={() => setHoveredNote(star)}
                          className="transition-transform active:scale-90 outline-none"
                        >
                          <Star
                            size={32}
                            className={`transition-colors duration-150 ${
                              star <= (hoveredNote || commentData.note)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-100"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Commentaire</label>
                    <textarea
                      value={commentData.contenu}
                      onChange={(e) => setCommentData({ ...commentData, contenu: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 focus:bg-white outline-none transition-all text-sm min-h-[140px] resize-none"
                      placeholder="Décrivez votre expérience..."
                    />
                  </div>

                  <button
                    onClick={handleAddComment}
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200"
                  >
                    {isSubmitting ? "Envoi..." : "Publier l'avis"}
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comments;