import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

export function distanceInWords(date, options = {}) {
  const opts = {
    includeSeconds: true,
    addSuffix: true,
    ...options,
  };
  return distanceInWordsToNow(date, opts);
}

export default {
  distanceInWords,
};
