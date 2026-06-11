import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCheck, Copy, Star, Reply, Trash2, Forward, Pin, BarChart3, Download, ExternalLink, FileText, FileSpreadsheet, FileIcon, FileArchive, File } from 'lucide-react';
import PollMessage from './PollMessage';

const REACTIONS = ['❤️', '👍', '😂', '🔥', '😮', '😢'];

// Helper to get file extension from filename
const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Get file icon component based on type/extension
const getFileIcon = (attachment) => {
  const ext = getFileExtension(attachment.filename);
  const type = attachment.type;

  if (type === 'pdf' || ext === 'pdf') return { icon: FileText, color: '#EF4444', bg: '#FEE2E2', label: 'PDF' };
  if (type === 'doc' || ['doc', 'docx'].includes(ext)) return { icon: FileText, color: '#3B82F6', bg: '#DBEAFE', label: 'DOC' };
  if (type === 'xls' || ['xls', 'xlsx', 'csv'].includes(ext)) return { icon: FileSpreadsheet, color: '#10B981', bg: '#D1FAE5', label: 'XLS' };
  if (type === 'ppt' || ['ppt', 'pptx'].includes(ext)) return { icon: FileText, color: '#F59E0B', bg: '#FEF3C7', label: 'PPT' };
  if (type === 'zip' || ['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return { icon: FileArchive, color: '#8B5CF6', bg: '#EDE9FE', label: 'ZIP' };
  if (type === 'txt' || ext === 'txt') return { icon: File, color: '#6B7280', bg: '#F3F4F6', label: 'TXT' };
  return { icon: FileIcon, color: '#6B7280', bg: '#F3F4F6', label: ext.toUpperCase() || 'FILE' };
};

// Format file size (for future use)
const formatFileName = (name, maxLen = 28) => {
  if (!name) return 'File';
  if (name.length <= maxLen) return name;
  const ext = getFileExtension(name);
  const base = name.slice(0, name.lastIndexOf('.'));
  const truncated = base.slice(0, maxLen - ext.length - 4) + '...';
  return `${truncated}.${ext}`;
};

// Check if text is just a raw URL (to suppress it when attachments exist)
const isRawUrl = (text) => {
  if (!text) return false;
  const trimmed = text.trim();
  return /^https?:\/\/\S+$/.test(trimmed);
};

// Highlight @mentions in text
const highlightMentions = (text, isOwn) => {
  if (!text) return text;
  const mentionRegex = /@(\w+)/g;
  const parts = text.split(mentionRegex);
  const textColorClass = isOwn ? 'text-white' : 'text-gray-900';

  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return (
        <span key={idx} className="font-semibold text-nexus-primary cursor-pointer hover:underline">
          @{part}
        </span>
      );
    }
    return part;
  });
};

const ChatBubble = ({
  message,
  isOwn,
  isGroup,
  index,
  onReply,
  onReact,
  onEdit,
  onDeleteMe,
  onDeleteEveryone,
  onForward,
  onStar,
  onCopy,
  onPin,
  onScrollToReply,
  onViewInfo,
  searchQuery,
  messageRef,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const longPressRef = useRef(null);

  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const highlightText = (text = '') => {
    if (!searchQuery || !text) return text;
    const regex = new RegExp(`(${escapeRegExp(searchQuery)})`, 'gi');
    return text.split(regex).map((part, idx) => (
      regex.test(part) ? (
        <mark key={idx} className="bg-yellow-200 text-gray-900 px-0.5 rounded">
          {part}
        </mark>
      ) : part
    ));
  };

  const handleTouchStart = () => {
    longPressRef.current = setTimeout(() => setShowMobileMenu(true), 600);
  };

  const handleTouchEnd = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  if (message.deletedForEveryone) {
    return (
      <div className={`flex mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <p className="text-xs text-gray-500 italic px-3 py-2 bg-gray-100 rounded-xl">
          This message was deleted
        </p>
      </div>
    );
  }

  if (message.messageType === 'system') {
    return (
      <div className="flex justify-center my-2 w-full">
        <div className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold max-w-[85%] text-center shadow-sm border border-gray-200/50">
          {message.text}
        </div>
      </div>
    );
  }

  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const attachment = message.attachments?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.2) }}
      className={`flex mb-1 group ${isOwn ? 'justify-end' : 'justify-start'} min-w-0`}
    >
      <div className="relative max-w-[min(85%,280px)] sm:max-w-[80%] min-w-0">
        {message.replyTo && (
          <button
            type="button"
            onClick={() => onScrollToReply?.(message.replyTo._id)}
            className={`w-full text-left text-xs px-3 py-1 mb-1 rounded-lg border-l-4 border-nexus-accent bg-white/80 ${isOwn ? 'ml-auto' : ''}`}
          >
            <p className="font-semibold text-nexus-secondary truncate">
              {message.replyTo.sender?.fullName || 'User'}
            </p>
            <p className="text-gray-500 truncate">{message.replyTo.text || 'Attachment'}</p>
          </button>
        )}

        <div
          ref={messageRef}
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`relative px-3 py-2 rounded-xl message-bubble shadow-sm ${isOwn ? 'bg-nexus-primary text-white rounded-br-sm' : 'bg-white text-gray-900 rounded-bl-sm'
            }`}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowMenu(true);
          }}
        >
          {/* Image attachment - preview card */}
          {attachment?.type === 'image' && (
            <div className="attachment-card attachment-card-image mb-1.5">
              <a href={attachment.url} target="_blank" rel="noreferrer" className="block relative group/img">
                <img
                  src={attachment.url}
                  alt={attachment.filename || 'Image'}
                  className="rounded-lg max-w-full max-h-60 object-cover w-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <ExternalLink size={24} className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
              </a>
              {attachment.filename && (
                <div className="flex items-center justify-between mt-1.5 px-0.5">
                  <span className={`text-[11px] truncate max-w-[70%] ${isOwn ? 'text-white/70' : 'text-gray-500'}`}>
                    {formatFileName(attachment.filename)}
                  </span>
                  <a
                    href={attachment.url}
                    download={attachment.filename}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-1 rounded-full transition-colors ${isOwn ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={13} />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Video attachment */}
          {attachment?.type === 'video' && (
            <div className="attachment-card mb-1.5">
              <video src={attachment.url} controls className="rounded-lg max-w-full max-h-60 w-full" />
              {attachment.filename && (
                <div className="flex items-center justify-between mt-1.5 px-0.5">
                  <span className={`text-[11px] truncate max-w-[70%] ${isOwn ? 'text-white/70' : 'text-gray-500'}`}>
                    {formatFileName(attachment.filename)}
                  </span>
                  <a
                    href={attachment.url}
                    download={attachment.filename}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-1 rounded-full transition-colors ${isOwn ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                  >
                    <Download size={13} />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Audio attachment */}
          {attachment?.type === 'audio' && (
            <div className="attachment-card mb-1.5">
              <audio controls preload="auto" crossOrigin="anonymous" className="w-full max-w-full min-w-0">
                <source src={attachment.url} type={attachment.mimetype || 'audio/webm'} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* PDF attachment - special card */}
          {attachment?.type === 'pdf' && (() => {
            const fileInfo = getFileIcon(attachment);
            const IconComp = fileInfo.icon;
            return (
              <div className={`attachment-card attachment-card-doc mb-1.5 rounded-lg overflow-hidden border ${isOwn ? 'border-white/20 bg-white/10' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-3 p-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: fileInfo.bg }}>
                    <IconComp size={20} style={{ color: fileInfo.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isOwn ? 'text-white' : 'text-gray-800'}`}>
                      {formatFileName(attachment.filename || 'Document.pdf')}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${isOwn ? 'text-white/60' : 'text-gray-400'}`}>
                      {fileInfo.label} Document
                    </p>
                  </div>
                </div>
                <div className={`flex border-t ${isOwn ? 'border-white/15' : 'border-gray-200'}`}>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${isOwn ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-nexus-primary hover:bg-nexus-primary/5'}`}
                  >
                    <ExternalLink size={13} />
                    Open
                  </a>
                  <div className={`w-px ${isOwn ? 'bg-white/15' : 'bg-gray-200'}`} />
                  <a
                    href={attachment.url}
                    download={attachment.filename}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${isOwn ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-nexus-primary hover:bg-nexus-primary/5'}`}
                  >
                    <Download size={13} />
                    Download
                  </a>
                </div>
              </div>
            );
          })()}

          {/* Generic document attachment card */}
          {attachment && !['image', 'video', 'audio', 'pdf'].includes(attachment.type) && (() => {
            const fileInfo = getFileIcon(attachment);
            const IconComp = fileInfo.icon;
            return (
              <div className={`attachment-card attachment-card-doc mb-1.5 rounded-lg overflow-hidden border ${isOwn ? 'border-white/20 bg-white/10' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-3 p-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: fileInfo.bg }}>
                    <IconComp size={20} style={{ color: fileInfo.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isOwn ? 'text-white' : 'text-gray-800'}`}>
                      {formatFileName(attachment.filename || 'File')}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${isOwn ? 'text-white/60' : 'text-gray-400'}`}>
                      {fileInfo.label} File
                    </p>
                  </div>
                  <a
                    href={attachment.url}
                    download={attachment.filename}
                    target="_blank"
                    rel="noreferrer"
                    className={`shrink-0 p-2 rounded-full transition-colors ${isOwn ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>
            );
          })()}

          {/* Poll Message */}
          {message.poll && message.poll.question ? (
            <PollMessage message={message} isGroup={isGroup} />
          ) : (
            <>
              {message.text && !isRawUrl(message.text) && (
                <p className="text-sm break-words whitespace-pre-wrap">
                  {highlightMentions(message.text, isOwn)}
                  {message.edited && <span className="text-[10px] text-gray-400 ml-1">(edited)</span>}
                </p>
              )}
            </>
          )}
          {message.forwarded && (
            <p className="text-[10px] text-gray-400 italic">Forwarded</p>
          )}

          <div className={`flex items-center gap-1 mt-0.5 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[10px] text-gray-500">{formatTime(message.createdAt)}</span>
            {isOwn && (
              message.seen ? (
                <CheckCheck size={14} className="text-nexus-accent" />
              ) : message.delivered ? (
                <CheckCheck size={14} className="text-gray-400" />
              ) : (
                <Check size={14} className="text-gray-400" />
              )
            )}
            {message.pinned && <Pin size={10} className="text-gray-400" />}
          </div>

          {Array.isArray(message.reactions) && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {message.reactions.map((r, i) => (
                <span key={i} className="text-xs bg-white rounded-full px-1.5 py-0.5 shadow-sm">
                  {r.emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        {showReactions && (
          <div className="flex gap-1 mt-1 p-1 bg-white rounded-full border border-gray-200 shadow-sm">
            {REACTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => { onReact?.(message, emoji); setShowReactions(false); setShowMenu(false); }}
                className="text-lg hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowMenu((v) => !v)}
          className={`absolute top-2 right-2 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 p-1 rounded-full bg-white/90 shadow text-gray-500 text-xs z-10`}
        >
          ⋮
        </button>

        <AnimatePresence>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} aria-hidden="true" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`absolute z-40 right-2 top-full mt-1 max-h-[60vh] overflow-y-auto w-[min(220px,calc(100vw-2rem))] bg-white rounded-xl shadow-lg border border-gray-100 py-1`}
              >
                {
                  // Build menu according to private/group and ownership
                  (() => {
                    const items = [];
                    // Reply
                    items.push({ icon: Reply, label: 'Reply', action: () => onReply?.(message) });
                    // Copy
                    items.push({ icon: Copy, label: 'Copy', action: () => onCopy?.(message) });
                    // Star
                    items.push({ icon: Star, label: 'Star', action: () => onStar?.(message) });
                    // Forward
                    items.push({ icon: Forward, label: 'Forward', action: () => onForward?.(message) });
                    // Edit (only if own)
                    if (isOwn) items.push({ icon: Trash2, label: 'Edit', action: () => onEdit?.(message) });
                    // Delete
                    if (isOwn) {
                      // private: offer delete for everyone
                      if (!message.group && onDeleteEveryone) items.push({ icon: Trash2, label: 'Delete For Everyone', action: () => onDeleteEveryone?.(message) });
                      // group or private: offer delete for me
                      items.push({ icon: Trash2, label: 'Delete', action: () => onDeleteMe?.(message) });
                    } else {
                      // not own: offer delete for me
                      items.push({ icon: Trash2, label: 'Delete', action: () => onDeleteMe?.(message) });
                    }

                    // Group specific extra
                    if (message.group) {
                      items.push({ icon: Pin, label: 'View Message Info', action: () => onViewInfo?.(message) });
                    }

                    return items.map(({ icon: Icon, label, action }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => { action(); setShowMenu(false); setShowReactions(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Icon size={14} />
                        {label}
                      </button>
                    ));
                  })()
                }
                <div className="border-t border-gray-100 px-2 py-2 flex gap-1 flex-wrap">
                  {REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => { onReact?.(message, emoji); setShowMenu(false); }}
                      className="text-lg hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMobileMenu && (
            <>
              <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setShowMobileMenu(false)} aria-hidden="true" />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28 }}
                className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl p-4 safe-bottom"
              >
                <div className="max-w-lg mx-auto space-y-3">
                  <button
                    type="button"
                    onClick={() => { onReply?.(message); setShowMobileMenu(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <Reply size={18} />
                    Reply
                  </button>

                  <div className="p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-2">React</div>
                    <div className="flex gap-2">
                      {REACTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => { onReact?.(message, emoji); setShowMobileMenu(false); }}
                          className="text-2xl"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isOwn && (
                    <button
                      type="button"
                      onClick={() => { onEdit?.(message); setShowMobileMenu(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Trash2 size={18} />
                      Edit
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => { onDeleteMe?.(message); setShowMobileMenu(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => { onCopy?.(message); setShowMobileMenu(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <Copy size={18} />
                    Copy
                  </button>

                  <button
                    type="button"
                    onClick={() => { onForward?.(message); setShowMobileMenu(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <Forward size={18} />
                    Forward
                  </button>

                  <button
                    type="button"
                    onClick={() => { onStar?.(message); setShowMobileMenu(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <Star size={18} />
                    Star
                  </button>

                  {message.group && (
                    <button
                      type="button"
                      onClick={() => { onViewInfo?.(message); setShowMobileMenu(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Pin size={18} />
                      View Message Info
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
