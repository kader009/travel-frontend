import { X, Send, Loader2 } from 'lucide-react';
import { JoinRequestModalProps } from '@/src/types/props';

const JoinRequestModal = ({
  isOpen,
  onClose,
  id,
  trip,
  requestMessage,
  setRequestMessage,
  handleSubmitRequest,
  isJoining,
}: JoinRequestModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />

      <div
        className="relative w-full max-w-lg bg-white dark:bg-background-dark rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 fade-in duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-900 dark:bg-background-dark p-8 pb-10 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="size-5 text-white" />
          </button>
          <div className="size-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Send className="size-7 text-primary" strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-[0.15em]">
            Join Request
          </h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
            Send your request to the expedition lead
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Expedition ID
            </label>
            <div className="w-full px-5 py-4 bg-slate-100 dark:bg-background-dark rounded-2xl text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide select-all cursor-default border border-slate-200 dark:border-slate-700">
              {id}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Your Message
            </label>
            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder={`Hi! I'd love to join your trip to ${trip?.destination}. Let me know if there's room!`}
              rows={4}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-background-dark rounded-2xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
            />
          </div>
        </div>

        <div className="px-8 pb-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 dark:bg-background-dark text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitRequest}
            disabled={isJoining || !requestMessage.trim()}
            className="flex-1 py-4 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
          >
            {isJoining ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestModal;
