import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { LinkItem } from '../data/navigationConfig';

interface LinkCardProps {
  link: LinkItem;
  isEditing?: boolean;
  onEdit?: (link: LinkItem) => void;
  onDelete?: (link: LinkItem) => void;
}

export const LinkCard = ({ link, isEditing = false, onEdit, onDelete }: LinkCardProps) => {
  const handleClick = () => {
    if (!isEditing) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`
        glass-card p-5 group relative
        ${!isEditing ? 'cursor-pointer' : 'cursor-default'}
      `}
      onClick={handleClick}
    >
      {/* Content */}
      <div className="flex items-start gap-4">
        <div className="text-2xl flex-shrink-0 text-theme-primary">
          <i className={link.icon}></i>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-base mb-2 truncate">
            {link.title}
          </h4>
          <p className="text-white/70 text-sm line-clamp-2">
            {link.description}
          </p>
        </div>
        {!isEditing && (
          <ExternalLink className="w-5 h-5 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        )}
      </div>

      {/* Edit Controls */}
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(link);
            }}
            className="p-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-300 transition-colors"
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(link);
            }}
            className="p-1 bg-red-500/20 hover:bg-red-500/30 rounded text-red-300 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};