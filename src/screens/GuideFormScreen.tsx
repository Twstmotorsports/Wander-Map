import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Guide, GuideFormMode } from '../types';

export type GuideFormProps = {
  mode: GuideFormMode;
  initialGuide: Guide | null;
  onSave: (mode: GuideFormMode, data: Omit<Guide, 'id'>) => void;
  onCancel: () => void;
  onDelete?: () => void;
};

export const GuideFormScreen: React.FC<GuideFormProps> = ({
  mode,
  initialGuide,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [title, setTitle] = useState(initialGuide?.title ?? '');
  const [location, setLocation] = useState(initialGuide?.location ?? '');
  const [content, setContent] = useState(initialGuide?.content ?? '');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>(
    initialGuide?.photoUrls ?? []
  );

  const handleAddPhotoUrl = () => {
    const value = photoUrlInput.trim();
    if (!value) {
      return;
    }
    setPhotoUrls((prev) => [...prev, value]);
    setPhotoUrlInput('');
  };

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }
    onSave(mode, {
      title: title.trim(),
      location: location.trim(),
      content: content.trim(),
      photoUrls,
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.formContainer}
    >
      <Text style={styles.title}>
        {mode === 'create' ? 'New Travel Guide' : 'Edit Travel Guide'}
      </Text>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Guide title"
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />
      <Text style={styles.label}>Guide</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={content}
        onChangeText={setContent}
        placeholder="Write tips, recommendations, and notes"
        multiline
        textAlignVertical="top"
      />
      <Text style={styles.label}>Photo URLs (optional)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          value={photoUrlInput}
          onChangeText={setPhotoUrlInput}
          placeholder="Paste an image URL"
        />
        <TouchableOpacity style={styles.smallButton} onPress={handleAddPhotoUrl}>
          <Text style={styles.smallButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {photoUrls.length > 0 && (
        <View style={styles.photoPreviewContainer}>
          <ScrollView horizontal>
            {photoUrls.map((url, index) => (
              <Image
                key={index.toString()}
                source={{ uri: url }}
                style={styles.photoPreview}
              />
            ))}
          </ScrollView>
        </View>
      )}
      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Save Guide</Text>
      </TouchableOpacity>
      {onDelete && (
        <TouchableOpacity style={styles.dangerButton} onPress={onDelete}>
          <Text style={styles.dangerButtonText}>Delete Guide</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.textButton} onPress={onCancel}>
        <Text style={styles.textButtonText}>Back to Guides</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
