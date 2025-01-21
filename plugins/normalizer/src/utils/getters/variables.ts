import { convertToRGBScale } from "../colors";

export function getVariables(collections: VariableCollection[]) {
  return collections.reduce((acc, collection) => {
    const collectionVariables = collection.variableIds
      .map((id) => {
        const variable = figma.variables.getVariableById(id);
        if (variable) {
          const modeId = collection.defaultModeId;
          return {
            id: variable.id,
            name: variable.name,
            type: variable.resolvedType,
            value: convertToRGBScale(variable.valuesByMode[modeId] as RGBA),
          };
        }
        return null;
      })
      .filter((variable) => variable !== null);

    return [...acc, ...collectionVariables];
  }, [] as any[]);
}
