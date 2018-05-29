export interface IngestionConfiguration {
  cncUrl: string;
  kibanaUrl: string;
}

export let ingestionConfig: IngestionConfiguration;

export const ingestionConfigPromise = new Promise<IngestionConfiguration>((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './assets/ingestion-configuration.json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      ingestionConfig = JSON.parse(xhr.responseText);
      resolve(ingestionConfig);
    } else {
      reject('Cannot load configuration');
    }
  };
  xhr.send();
});
