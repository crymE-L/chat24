export default function PersonalDataChunk({ title: string, children: any }) {
  <div className="space-y-2">
    <p className="text-lg font-semibold">{title}</p>
    {children}
  </div>;
}
