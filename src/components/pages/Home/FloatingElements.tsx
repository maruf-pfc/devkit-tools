export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating code symbols */}
      <div className="absolute top-20 left-10 animate-float-slow opacity-20">
        <div className="text-4xl font-mono text-primary">{`{}`}</div>
      </div>
      <div className="absolute top-32 right-20 animate-float-medium opacity-15">
        <div className="text-3xl font-mono text-primary">{`</>`}</div>
      </div>
      <div className="absolute top-40 left-1/4 animate-float-fast opacity-10">
        <div className="text-2xl font-mono text-primary">[]</div>
      </div>
      <div className="absolute bottom-40 right-10 animate-float-slow opacity-20">
        <div className="text-3xl font-mono text-primary">{`()`}</div>
      </div>
      <div className="absolute bottom-32 left-16 animate-float-medium opacity-15">
        <div className="text-2xl font-mono text-primary">{`=>`}</div>
      </div>
      <div className="absolute top-60 right-1/3 animate-float-fast opacity-10">
        <div className="text-xl font-mono text-primary">&&</div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-24 right-1/4 animate-float-slow">
        <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-24 left-1/3 animate-float-medium">
        <div className="w-2 h-2 bg-primary/30 rotate-45"></div>
      </div>
      <div className="absolute top-1/2 left-8 animate-float-fast">
        <div className="w-4 h-4 border border-primary/20 rounded-full"></div>
      </div>
    </div>
  );
}
