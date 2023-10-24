const OptigrationSDK = require('@devops-optimove/optigration-sdk-js')


class SDK {
  constructor() {
    this.metadata = {}; // Store metadata
    this.customersList = []; // Store customers list
    this.optigrationSDK = null;
  }

  init(data) {
    this.metadata = {
      eventTypeID: data.EventTypeID,
      timeStamp: data.TimeStamp,
      engagementID: data.EngagementID,
      bucketName: data.BucketName,
      customersFolderPath: data.CustomersFolderPath,
      metadataFilePath: data.MetadataFilePath,
      tenantID: data.TenantID
    }
    
    this.optigrationSDK = new OptigrationSDK(this.metadata);
  }

  isSDKInitialized() {
    return this.optigrationSDK ? 'initialized' : 'not initialized';
  }

  async getMetadata() {
    if (!this.optigrationSDK) {
      throw 'SDK is not initialized';
    }

    return this.optigrationSDK.getMetaData();
  }

  async getCustomers(batchID) {
    if (!this.optigrationSDK) {
      throw 'SDK is not initialized';
    }

    if (!batchID) {
      throw 'BatchID cannot be empty';
    }

    const metadata = await this.getMetadata();

    if (parseInt(batchID) > metadata.numberOfFiles) {
      throw `batchID ${batchID} doens't exist, max batch id: ${metadata.numberOfFiles}`;
    }

    return this.optigrationSDK.getCustomersByBatchID(batchID)
  }
}

module.exports = SDK;
