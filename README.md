# Description:
A method to downloading your objects stored in a s3 bucket. 
# Features
 * dynamic use of s3 key and bucket
 * Works for files in **public Folders** 
 # Updates Coming Soon
 Compatibility with subfolders for private buckets (coming soon)
 # Requirements for script
  * Create Folder Utils.
  * In this folder Create 2 files named configuration.json and getObjectParams.json(alternatively name file yourself). These files are required for the tool to run.
  
This Repository has a GNU License.
Copyright © 2022 MatthewDeLeon-ops

```JSON
configuration file: {
	"accessKeyId": "accessKeyId",
	"secretAccessKey": "secretAccessKey",
	"region": "region"
}
getObjectParams: {
	"Bucket": "bucketname",
	"Prefix": "bucketprefixpath"
	"Key": "fileNameKey"
}

turn on "type": "module" in package.json to use privates3Bucket downloader. Currently this feature is being developed.