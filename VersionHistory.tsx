import React from 'react';
import { ResumeVersion } from '../../types/resume';
import { Card, Button } from '../ui';
import { loadVersions, deleteVersion } from '../../utils/storage';
import { History, Trash2, RotateCcw, Clock } from 'lucide-react';

interface Props {
  onRestore: (data: ResumeVersion['data']) => void;
}

export const VersionHistory: React.FC<Props> = ({ onRestore }) => {
  const [versions, setVersions] = React.useState<ResumeVersion[]>([]);

  React.useEffect(() => {
    setVersions(loadVersions());
  }, []);

  const handleDelete = (id: string) => {
    deleteVersion(id);
    setVersions(v => v.filter(x => x.id !== id));
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <History className="w-4 h-4" />
        Version History
        <span className="ml-auto text-xs text-gray-500">({versions.length} versions)</span>
      </div>

      {versions.length === 0 ? (
        <Card className="p-4 text-center">
          <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No saved versions yet.</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Click "Save Version" to create a snapshot.</p>
        </Card>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {versions.map(version => (
            <Card key={version.id} className="p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{version.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(version.timestamp)}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRestore(version.data)}
                    icon={<RotateCcw className="w-3.5 h-3.5 text-indigo-500" />}
                    title="Restore this version"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(version.id)}
                    icon={<Trash2 className="w-3.5 h-3.5 text-red-400" />}
                    title="Delete version"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
