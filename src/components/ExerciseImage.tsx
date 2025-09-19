import React, { useState, useEffect } from "react";
import { Image, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { exerciseApi } from "../services/exerciseApi";
import { colors, spacing } from "../theme";

interface ExerciseImageProps {
  exerciseId: string;
  resolution?: string;
  style: any;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

const ExerciseImage: React.FC<ExerciseImageProps> = ({
  exerciseId,
  resolution = "180",
  style,
  resizeMode = "cover",
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(false);

        const imageUrl = exerciseApi.getExerciseImage(exerciseId, resolution);

        // Fetch the image data with proper headers
        const response = await fetch(imageUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
            "x-rapidapi-key":
              process.env.EXPO_PUBLIC_EXERCISEDB_API_KEY ||
              "cd0fbd45b2msh0d52603440da626p1959abjsnc9ecbe645fb6",
          },
        });

        if (response.ok) {
          // Convert the response to a blob
          const blob = await response.blob();

          // Convert blob to base64 data URI
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            setImageUri(base64data);
          };
          reader.onerror = () => {
            setError(true);
          };
          reader.readAsDataURL(blob);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [exerciseId, resolution]);

  if (loading) {
    return (
      <View style={[style, styles.loadingContainer]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (error || !imageUri) {
    return (
      <View style={[style, styles.errorContainer]}>
        <View style={styles.placeholderIcon}>
          <Text style={styles.placeholderText}>?</Text>
        </View>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      resizeMode={resizeMode}
      onError={() => {
        console.error(`Failed to load image: ${imageUri}`);
        setError(true);
      }}
      onLoad={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.surfaceVariant,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    backgroundColor: colors.surfaceVariant,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default ExerciseImage;
