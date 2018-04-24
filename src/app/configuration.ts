export interface Configuration {
  showIdentifierVocabularySelection: boolean;
  showClassifierVocabularySelection: boolean;
  showCharacteristicVocabularySelection: boolean;
  showHistoryVocabularySelection: boolean;
  showCapabilityVocabularySelection: boolean;
  showContactVocabularySelection: boolean;
}

export let configuration: Configuration;

export const configPromise = new Promise<Configuration>((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './assets/configuration.json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      configuration = JSON.parse(xhr.responseText);
      resolve(configuration);
    } else {
      reject('Cannot load configuration');
    }
  };
  xhr.send();
});
