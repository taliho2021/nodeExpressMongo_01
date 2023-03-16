import { IsfSummaryModel, IsfSummary } from './../models/isfSummary';

// CREATE a new isfSummary document
export async function createIsfSummary(isfSummary: IsfSummary): Promise<IsfSummary> {
  const newIsfSummary = await IsfSummaryModel.create(isfSummary);
  return newIsfSummary.toObject();
}

// READ a single isfSummary document by id
export async function getIsfSummaryById(id: string): Promise<IsfSummary | null> {
  const isfSummary = await IsfSummaryModel.findById(id).exec();
  return isfSummary?.toObject() || null;
}

// READ all isfSummary documents
export async function getAllIsfSummaries(): Promise<IsfSummary[]> {
  const isfSummaries = await IsfSummaryModel.find().exec();
  return isfSummaries.map((isfSummary) => isfSummary.toObject());
}

// UPDATE an existing isfSummary document by id
export async function updateIsfSummaryById(
  id: string,
  updates: Partial<IsfSummary>
): Promise<IsfSummary | null> {
  const isfSummary = await IsfSummaryModel.findByIdAndUpdate(id, updates, {
    new: true,
  }).exec();
  return isfSummary?.toObject() || null;
}

// DELETE an existing isfSummary document by id
export async function deleteIsfSummaryById(id: string): Promise<IsfSummary | null> {
  const isfSummary = await IsfSummaryModel.findByIdAndDelete(id).exec();
  return isfSummary?.toObject() || null;
}

