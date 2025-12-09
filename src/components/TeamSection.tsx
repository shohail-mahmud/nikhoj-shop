import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  instagram: string;
  image_url: string;
}

export const TeamSection = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setTeam(data);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Meet the Nikhoj Team
        </h2>

        <div className="flex justify-center items-center gap-8 flex-wrap">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center animate-fade-in"
            >
              <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20">
                <AvatarImage src={member.image_url} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <a
                href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-1"
              >
                {member.instagram}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};