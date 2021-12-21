export function sigmoid (z, k=2)
{
    return 1 / (1 + Math.exp(-z / k));
}