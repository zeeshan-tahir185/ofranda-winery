import { revalidatePath } from "next/cache";

export const refreshSite = () => {
  try {
    revalidatePath("/", "layout");
  } catch {}
};
