import { useState } from 'react';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Category, LinkItem } from '../data/navigationConfig';
import { LinkCard } from './LinkCard';

interface CategoryCardProps {
  category: Category;
  isEditing?: boolean;
  onEditCategory?: (category: Category) => void;
  onDeleteCategory?: (category: Category) => void;
  onAddLink?: (categoryId: string) => void;
  onEditLink?: (categoryId: string, link: LinkItem) => void;
  onDeleteLink?: (categoryId: string, link: LinkItem) => void;
}

export const CategoryCard = ({ 
  category, 
  isEditing = false,
  onEditCategory,
  onDeleteCategory,
  onAddLink,
  onEditLink,
  onDeleteLink
}: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="glass-card p-6 animate-fade-in">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <i className={`${category.icon} text-2xl text-theme-primary`}></i>
          <h3 className="text-white text-lg font-medium">{category.name}</h3>
          <span className="text-white/60 text-sm">({category.links.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing && (
            <>
              <button
                onClick={() => onAddLink?.(category.id)}
                className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEditCategory?.(category)}
                className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-300 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteCategory?.(category)}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Links Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {category.links.map((link, index) => (
            <LinkCard
              key={`${link.url}-${index}`}
              link={link}
              isEditing={isEditing}
              onEdit={(link) => onEditLink?.(category.id, link)}
              onDelete={(link) => onDeleteLink?.(category.id, link)}
            />
          ))}
          
          {category.links.length === 0 && (
            <div className="col-span-full text-center py-8 text-white/60">
              暂无链接
              {isEditing && (
                <button
                  onClick={() => onAddLink?.(category.id)}
                  className="block mx-auto mt-2 text-theme-primary hover:text-theme-accent transition-colors"
                >
                  点击添加链接
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};